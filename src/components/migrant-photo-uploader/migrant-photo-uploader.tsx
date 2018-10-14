import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { StorageService } from '../../services/storage';

@Component({
  tag: 'migrant-photo-uploader',
  styleUrl: 'migrant-photo-uploader.scss'
})
export class MigrantPhotoUploader {
  @Element()
  photoUploaderEl: HTMLElement;

  @Prop()
  photo: string;
  @Prop()
  path: string;
  @Prop()
  fallback: string;
  @Prop()
  name?: string;
  @Prop()
  filename?: string;

  @State()
  photoUrl: string;

  @Event()
  migrantUploadPhoto: EventEmitter;
  @Event()
  ionChange: EventEmitter;
  @Event()
  ionBlur: EventEmitter;

  storage: StorageService;

  @Watch('photo')
  onPhotoChange() {
    this.updatePhoto();
  }

  componentDidLoad() {
    this.storage = new StorageService();
    this.updatePhoto();
  }

  updatePhoto() {
    this.photoUrl = this.photo ? this.photo : this.fallback;
    console.log(this.photoUrl);
  }

  triggerFileInput(_event) {
    const fileInputEl: any = this.photoUploaderEl.querySelector(
      'input[type="file"]'
    );
    fileInputEl.click();
  }

  selectFile(event) {
    this.uploadPhoto(event.target.files[0]);
  }

  makeFilePath(file) {
    let fileNameParts = file.name.split('.');
    fileNameParts = fileNameParts[fileNameParts.length - 1];
    const newDate = `${+new Date()}`;

    return this.path + '/' + newDate + '.' + fileNameParts;
  }

  async uploadPhoto(file) {
    const newPath = this.makeFilePath(file);

    const ref = await this.storage
      .getRef(newPath)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      });

    const putFileRef = await this.storage
      .upload(ref, file)
      .then(data => {
        return data.ref;
      })
      .catch(error => {
        console.log(error);
      });

    this.photoUrl = await this.storage.getPhotoUrl(putFileRef);

    this.ionChange.emit({
      event,
      name: this.name ? this.name : 'photo',
      value: this.photoUrl
    });
  }

  onDrop(event) {
    event.preventDefault();
    this.uploadPhoto(event.dataTransfer.files[0]);
  }

  onDrag(event) {
    event.preventDefault();
  }

  onDragEnter(event) {
    console.log('Show UI to drop file', event);
  }

  onDragLeave(event) {
    console.log('Hide UI to drop file', event);
  }

  render() {
    return (
      <div
        class="uploader-container"
        style={{ backgroundImage: `url('${this.photoUrl}')` }}
        onClick={event => this.triggerFileInput(event)}
        onDrop={event => this.onDrop(event)}
        onDragOver={event => this.onDrag(event)}
        onDragEnter={event => this.onDragEnter(event)}
        onDragLeave={event => this.onDragLeave(event)}
      >
        <input
          type="file"
          onChange={event => this.selectFile(event)}
          accept="image/*"
          value=""
        />
        <ion-icon name="camera" />
      </div>
    );
  }
}
