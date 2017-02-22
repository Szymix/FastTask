import { FastTaskPage } from './app.po';

describe('fast-task App', function() {
  let page: FastTaskPage;

  beforeEach(() => {
    page = new FastTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
