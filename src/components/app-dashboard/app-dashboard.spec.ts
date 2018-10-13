import { TestWindow } from '@stencil/core/testing';
import { AppDashboard } from './app-dashboard';

describe('app-dashboard', () => {
  it('should build', () => {
    expect(new AppDashboard()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppDashboardElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppDashboard],
        html: '<app-dashboard></app-dashboard>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
