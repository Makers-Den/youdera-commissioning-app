import AbstractPage from '../abstract.page';
import CompletePage from '../complete.page';
import ConfirmationDialog from '../confirmation-dialog.component';
import NavbarComponent from '../navbar.component';
import SelectProjectPage from '../select-project.page';

class StringLayoutPage extends AbstractPage {
  navbar: NavbarComponent;
  constructor() {
    super();
    this.assertPageContent('String layout');
    this.navbar = new NavbarComponent();
  }

  uploadStringLayout() {
    this.getCy('upload')
      .first()
      .selectFile({ contents: 'cypress/fixtures/test.png' }, { force: true });
    this.getCy('string-item-0').should('be.visible')
    this.getCy('toast').first().should('contain', 'File uploaded successfully');

    this.getCy('upload')
      .first()
      .selectFile({ contents: 'cypress/fixtures/test.png' }, { force: true });
    this.getCy('string-item-1').should('be.visible')
    this.getCy('toast').first().should('contain', 'File uploaded successfully');

    this.getCy('upload')
      .last()
      .selectFile({ contents: 'cypress/fixtures/test.png' }, { force: true });
    this.getCy('additional-item-0').should('be.visible')
    this.getCy('toast').first().should('contain', 'File uploaded successfully');

    this.getCy('upload')
      .last()
      .selectFile({ contents: 'cypress/fixtures/test.png' }, { force: true });
    this.getCy('additional-item-1').should('be.visible')

    this.getCy('toast').first().should('contain', 'File uploaded successfully');

    const confirmationDialog = new ConfirmationDialog<StringLayoutPage>(StringLayoutPage, () => {
      this.getCy('toast').should('contain', 'File deleted successfully!');
      this.getCy('toast').should('not.exist');
      this.getCy('close-dialog').click();
    })

    this.getCy('string-item-1').click();
    this.getCy('delete').click();
    confirmationDialog.confirm()

    this.getCy('additional-item-1').click({ force: true });
    this.getCy('delete').click();
    confirmationDialog.confirm()

    return this
  }

  next() {
    this.getCy('footer-button-1').click()
    return new ConfirmationDialog<CompletePage>(CompletePage)
  }
}

export default StringLayoutPage;
