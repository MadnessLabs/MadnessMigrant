import firebase from 'firebase/app';
import 'firebase/firestore';

export class LanguageService {
  currentLanguage = 'en';
  currentVoice = 'UK English Male';
  collectionName = 'languages';
  db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this.db = db;
  }

  /**
   * Get a lump of text translated for currently set language
   * @param name The name of the key to get from the document
   * @param language The language document to grab
   */
  async get(name: string, language?: string) {
    const languageDocRef = await this.db
      .collection(this.collectionName)
      .doc(language ? language : this.currentLanguage)
      .get();

    return languageDocRef.data()[name];
  }

  /**
   * Get the voice to set for speech synthesis
   * @param language The language document to grab
   */
  async getVoice(language?: string) {
    return await this.get('voice', language ? language : this.currentLanguage);
  }

  /**
   * Set the default language for the application
   * @param language The 2 character language code to set as default
   */
  async setLanguage(language: string) {
    this.currentLanguage = language;
    this.currentVoice = await this.getVoice();

    return true;
  }
}
