import { TestWindow } from '@stencil/core/testing';
import { MigrantChat } from './migrant-chat';

describe('migrant-chat', () => {
  it('should build', () => {
    expect(new MigrantChat()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMigrantChatElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MigrantChat],
        html: '<migrant-chat></migrant-chat>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
