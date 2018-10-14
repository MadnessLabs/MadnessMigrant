import { TestWindow } from '@stencil/core/testing';
import { AppHome } from './app-home';

describe('app-home', () => {
  it('should build', () => {
    expect(new AppHome()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppHomeElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppHome],
        html: '<app-home></app-home>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
