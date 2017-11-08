import { CodingChallengeCasparHealthPage } from './app.po';

describe('coding-challenge-caspar-health App', () => {
  let page: CodingChallengeCasparHealthPage;

  beforeEach(() => {
    page = new CodingChallengeCasparHealthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
