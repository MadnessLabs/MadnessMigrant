import { TestWindow } from '@stencil/core/testing';
import { MigrantTextToSpeech } from './migrant-text-to-speech';

describe('migrant-text-to-speech', () => {
  it('should build', () => {
    expect(new MigrantTextToSpeech()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMigrantTextToSpeechElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MigrantTextToSpeech],
        html: '<migrant-text-to-speech></migrant-text-to-speech>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
