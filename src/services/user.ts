/**
 * @module Services
 */
import { APIService } from './api';
import { AuthService } from './auth';
import { ConfigService } from './config';
import { DatabaseService } from './database';

export class UserService {
  collectionName = 'users';
  endpoint = 'user';
  protected auth: AuthService;
  protected config: ConfigService;
  protected db: DatabaseService;
  protected api: APIService;
  public profile: any;
  public session: any;

  constructor(
    config?: ConfigService,
    db?: DatabaseService,
    api?: APIService,
    auth?: AuthService
  ) {
    this.config = config ? config : new ConfigService();
    this.db = db ? db : new DatabaseService();
    this.api = api ? api : new APIService();
    this.auth = auth ? auth : new AuthService();
    this.session = JSON.parse(localStorage.getItem('raf:session'));
    this.profile = JSON.parse(localStorage.getItem('raf:profile'));
  }

  emitProfileUpdatedEvent(data) {
    document.body.dispatchEvent(
      new CustomEvent('userProfileUpdated', { detail: { data } })
    );
  }

  getDocument(id: string) {
    return this.db.getDocument('users', id);
  }

  async getFeed(
    id: string,
    options?: {
      limit?: number;
      startAfter?: any;
      orderBy?: string;
      orderSort?: 'desc' | 'asc';
    }
  ) {
    const queryOptions: any = {
      limit: 3,
      startAfter: null,
      orderBy: 'createdAt',
      orderSort: 'desc',
      ...options
    };
    const feed = [];
    const feedCollection = await this.db
      .document(this.collectionName, id)
      .collection('feed');

    const lastDoc = queryOptions.startAfter
      ? await feedCollection.doc(queryOptions.startAfter).get()
      : null;

    const paginationQuery = queryOptions.startAfter
      ? feedCollection
          .orderBy(queryOptions.orderBy, queryOptions.orderSort)
          .startAfter(lastDoc)
          .limit(queryOptions.limit)
      : feedCollection
          .orderBy(queryOptions.orderBy, queryOptions.orderSort)
          .limit(queryOptions.limit);

    const pagination = await paginationQuery.get();

    for (const page of pagination.docs) {
      feed.push({ ...page.data(), id: page.id });
    }

    return feed;
  }

  async getFriends() {
    return await this.api.get('getFriends');
  }

  async find(id: string) {
    return this.db.find(this.collectionName, id);
  }

  async update(id: string, data: any) {
    return this.db.update(this.collectionName, id, data);
  }

  jsonToString(v) {
    const cache = new Map();

    return JSON.stringify(v, function(_key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.get(value)) {
          return;
        }
        // Store value in our map
        cache.set(value, true);
      }

      return value;
    });
  }

  clearCache() {
    const rep = /.*\?.*/,
      links = document.getElementsByTagName('link'),
      scripts = document.getElementsByTagName('script'),
      process_scripts = false;
    for (let i = 0; i < links.length; i++) {
      const link = links[i],
        href = link.href;
      link.href = rep.test(href)
        ? href + '&' + Date.now()
        : href + '?' + Date.now();
    }
    if (process_scripts) {
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i],
          src = script.src;
        script.src = rep.test(src)
          ? src + '&' + Date.now()
          : src + '?' + Date.now();
      }
    }
  }

  logout() {
    const firebaseConfig = this.config.get('firebase');
    this.auth.logout();
    window.localStorage.clear();
    this.clearCache();
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    indexedDB.deleteDatabase(
      `firestore/[DEFAULT]/${firebaseConfig.projectId}/main`
    );
    window.location.reload(true);
    this.unwatchProfile(this.profile.id);
    this.profile = null;
  }

  watchProfile(id: string, callback) {
    this.db.watchDocument(this.collectionName, id, snapshot => {
      localStorage.setItem('raf:profile', this.jsonToString(snapshot.data));
      this.profile = { ...snapshot.data, id };
      this.emitProfileUpdatedEvent(this.profile);

      if (callback && typeof callback === 'function') {
        callback(this.profile);
      }
    });
  }

  unwatchProfile(id: string) {
    return this.db.unwatchDocument(this.collectionName, id);
  }
}
