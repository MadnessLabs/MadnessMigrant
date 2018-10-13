import { TestWindow } from '@stencil/core/testing';
import { AppPrivacy } from './app-privacy';

describe('app-privacy', () => {
  it('should build', () => {
    expect(new AppPrivacy()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppPrivacyElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppPrivacy],
        html: '<app-privacy></app-privacy>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
