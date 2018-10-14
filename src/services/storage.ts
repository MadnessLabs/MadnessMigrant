import firebase from 'firebase/app';
import 'firebase/storage';

export class StorageService {
  service: firebase.storage.Storage;

  constructor() {
    this.service = this.service ? this.service : firebase.storage();
  }

  async getPhotoUrl(ref) {
    return ref.getDownloadURL();
  }

  async getRef(path) {
    return this.service.ref().child(path);
  }

  async upload(ref, file) {
    return ref.put(file);
  }
}
