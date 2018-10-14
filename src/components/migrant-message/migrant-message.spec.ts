import { TestWindow } from '@stencil/core/testing';
import { MigrantMessage } from './migrant-message';

describe('migrant-message', () => {
  it('should build', () => {
    expect(new MigrantMessage()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMigrantMessageElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MigrantMessage],
        html: '<migrant-message></migrant-message>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
