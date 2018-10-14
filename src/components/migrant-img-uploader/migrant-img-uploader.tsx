import { Component, Element, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';

import { StorageService } from "../../services/storage";

@Component({
    tag: 'migrant-img-uploader',
    styleUrl: 'migrant-img-uploader.css'
})
export class MigrantImgUploader {

    @Element() photoUploaderEl: HTMLMigrantImgUploaderElement;    

  /**
   * A link to the photo to display
   */
  @Prop() photo: string;
  /**
   * The storage path to upload the file to
   */
  @Prop() path: string;
  /**
   * The fallback image to use if photo isn't set
   */
  @Prop() fallback: string;
  /**
   * The name to use when emitting field change event
   */

  @Prop() name?: string;
  /**
   * The filename to use for the uploaded file
   */
  @Prop() filename?: string;

  @State() isLoading: boolean;
  @State() photoUrl: string;  

  @Event() migrantUploadPhoto: EventEmitter;
  @Event() migrantFieldChange: EventEmitter;  

  storage: StorageService;

  @Watch("photo")
  onPhotoChange() {
    this.updatePhoto();
  }

  componentDidLoad() {
    this.updatePhoto();
    this.storage = new StorageService();
  }

  updatePhoto() {
    this.photoUrl = this.photo
      ? this.photo
      : this.fallback
        ? this.fallback
        : null;
    this.isLoading = this.photoUrl ? false : true;
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

  uploadPhoto(file) {
    this.isLoading = true;
    const fileNameParts = file.name.split(".");
    this.storage
      .upload(
        `${this.path ? this.path + "/" : null}${
          this.filename ? this.filename : +new Date()
        }.${fileNameParts[fileNameParts.length - 1]}`,
        file
      )
      .then(data => {
        this.photoUrl = data.downloadURL;
        this.migrantUploadPhoto.emit({
          event,
          data: {
            photo: this.photoUrl
          }
        });
        if (this.name) {
          this.migrantFieldChange.emit({
            event,
            name: this.name,
            value: this.photoUrl
          });
        }
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error.message);
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
    console.log("Show UI to drop file", event);
  }

  onDragLeave(event) {
    console.log("Hide UI to drop file", event);
  }  

    render() {
        return (
            <div>
              <div class="upload-wrapper">
                <div
                  class={this.isLoading ? "photo is-loading" : "photo"}
                  style={{ backgroundImage: `url('${this.photoUrl}')` }}
                  onClick={event => this.triggerFileInput(event)}
                  onDrop={event => this.onDrop(event)}
                  onDragOver={event => this.onDrag(event)}
                  onDragEnter={event => this.onDragEnter(event)}
                  onDragLeave={event => this.onDragLeave(event)}
                ></div>
                <ion-icon name="cloud-upload"></ion-icon>
              </div> 
              <slot />
              <input
                type="file"
                onChange={event => this.selectFile(event)}
                accept="image/*"
              />
          </div>
          );
    }
}
