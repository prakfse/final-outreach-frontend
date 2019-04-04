import { browser, by, element } from 'protractor';

// describe('Login End to End Testing', function(){


//   it('should signup success', () => {
//     browser.get('http://localhost:4200/signup');
//     browser.sleep(3000);
//     element(by.css("input[formControlName= firstName]")).sendKeys('madhu');
//     browser.sleep(2000);
//     element(by.css("input[formControlName= lastName]")).sendKeys('Suresh');
//     browser.sleep(2000);
//     element(by.css("input[formControlName= empId]")).sendKeys('121264');
//     browser.sleep(2000);
//     element(by.css("input[formControlName= email]")).sendKeys('mees.surs@gmail.com');
//     browser.sleep(2000);
//     element(by.css("input[formControlName= password]")).sendKeys('Jan-123');
//     browser.sleep(2000);
//     element(by.css("input[formControlName= confirmPassword]")).sendKeys('Jan-123');
//     browser.sleep(2000);
//     element(by.css("input[formControlName= displayName]")).sendKeys('madhu');
//     browser.sleep(2000);
//     element(by.css("input[formControlName= buName]")).sendKeys('insurance');
//     browser.sleep(2000);    
//     element(by.id('mat-button-8')).click();
//     browser.sleep(2000);
//     element(by.id('mat-button-9')).click();
//     browser.sleep(2000);
//     expect(browser.getCurrentUrl()).toContain('volreg');
//   });
// });

// it('should login success', () => {
//   browser.get('http://localhost:4200/signin');
//   browser.sleep(3000);
//   element(by.css("input[formControlName= email]")).sendKeys('muuu.surs@gmail.com');
//   browser.sleep(2000);
//   element(by.css("input[formControlName= password]")).sendKeys('Jan-123');
//   browser.sleep(2000);
//   element(by.id('mat-button-10')).click();
//   browser.sleep(2000);
//   expect(browser.getCurrentUrl()).toContain('volreg');
// });



describe('Category E2E testing', function () {

  it('should login success', () => {
    browser.get('http://localhost:4200/signin');
    browser.sleep(3000);
    element(by.css("input[formControlName= email]")).sendKeys('a@a.com');
    browser.sleep(2000);
    element(by.css("input[formControlName= password]")).sendKeys('123456');
    browser.sleep(2000);
    element(by.id('mat-button-10')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('eventmgnt');
  });
});

describe('Reminder E2E testing', function () {

  it('create new reminder', () => {
    browser.get('http://localhost:4200/createevent');
    browser.sleep(3000);
    element(by.id('nbDropdown')).click();
    browser.sleep(2000);
    element(by.id('1')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('createevent');
  });
});


describe('Reminder E2E testing', function () {

  it('create new reminder', () => {
    browser.get('http://localhost:4200/createevent');
    browser.sleep(3000);
    element(by.id('nbDropdown')).click();
    browser.sleep(2000);
    element(by.id('2')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('eventlist');
  });
});

describe('Reminder E2E testing', function () {

  it('create new reminder', () => {
    browser.get('http://localhost:4200/createevent');
    browser.sleep(3000);
    element(by.id('nbDropdown')).click();
    browser.sleep(2000);
    element(by.id('3')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('signup');
  });
});

describe('Reminder E2E testing', function () {

  it('create new reminder', () => {
    browser.get('http://localhost:4200/createevent');
    browser.sleep(3000);
    element(by.id('nbDropdown')).click();
    browser.sleep(2000);
    element(by.id('4')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('userlist');
  });
});


describe('Reminder E2E testing', function () {

  it('create new reminder', () => {
    browser.get('http://localhost:4200/createevent');
    browser.sleep(3000);
    element(by.id('nbDropdown')).click();
    browser.sleep(2000);
    element(by.id('5')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('volreg');
  });
});

describe('Reminder E2E testing', function () {

  it('create new reminder', () => {
    browser.get('http://localhost:4200/createevent');
    browser.sleep(3000);
    element(by.id('nbDropdown')).click();
    browser.sleep(2000);
    element(by.id('6')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('uservolreglist');
  });
});

describe('Reminder E2E testing', function () {

  it('create new reminder', () => {
    browser.get('http://localhost:4200/createevent');
    browser.sleep(3000);
    element(by.id('nbDropdown')).click();
    browser.sleep(2000);
    element(by.id('7')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('eventpostupdates');
  });
});


describe('Reminder E2E testing', function () {

  it('create new reminder', () => {
    browser.get('http://localhost:4200/createevent');
    browser.sleep(3000);
    element(by.id('nbDropdown')).click();
    browser.sleep(2000);
    element(by.id('8')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('eventmgnt');
  });
});

