import { BluecloverUiPage } from './app.po';

describe('blueclover-ui App', () => {
  let page: BluecloverUiPage;

  beforeEach(() => {
    page = new BluecloverUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
