import firebase from 'firebase/app';
import 'firebase/firestore';

export class LanguageService {
  currentLanguage = 'en';
  collectionName = 'languages';
  db: firebase.firestore.Firestore;

  constructor(
    db: firebase.firestore.Firestore
  ) {
    this.db = db;
  }

  /**
   * Get a lump of text translated for currently set language
   * @param name The name of the key to get from the document
   * @param language The language document to grab
   */
  async get(name: string, language?: string) {
    const languageDocRef = await this.db.collection(this.collectionName).doc(language ? language : this.currentLanguage).get();
    
    return languageDocRef.data()[name];
  }

  /**
   * Set the default language for the application
   * @param language The 2 character language code to set as default
   */
  async setLanguage(language: string) {
    this.currentLanguage = language;

    return true;
  }

}
