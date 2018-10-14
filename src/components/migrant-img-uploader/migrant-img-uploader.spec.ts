import { TestWindow } from '@stencil/core/testing';
import { MigrantImgUploader } from './migrant-img-uploader';

describe('migrant-img-uploader', () => {
  it('should build', () => {
    expect(new MigrantImgUploader()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMigrantImgUploaderElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MigrantImgUploader],
        html: '<migrant-img-uploader></migrant-img-uploader>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
