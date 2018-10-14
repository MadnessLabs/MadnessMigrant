import { TestWindow } from '@stencil/core/testing';
import { MigrantSkills } from './migrant-skills';

describe('migrant-skills', () => {
  it('should build', () => {
    expect(new MigrantSkills()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMigrantSkillsElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MigrantSkills],
        html: '<migrant-skills></migrant-skills>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
