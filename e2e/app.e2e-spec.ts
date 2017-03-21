import { UncprojectPage } from './app.po';

describe('uncproject App', function() {
  let page: UncprojectPage;

  beforeEach(() => {
    page = new UncprojectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
