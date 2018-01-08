import { GuruAssignemntPage } from './app.po';

describe('guru-assignemnt App', function() {
  let page: GuruAssignemntPage;

  beforeEach(() => {
    page = new GuruAssignemntPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
