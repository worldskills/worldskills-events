describe('Events app', function() {

  it('should display events', function() {

    browser.get('');

    browser.driver.executeScript("window.sessionStorage.setItem('access_token', 'ABC123');");

    browser.get('/#/events');

    expect(browser.getTitle()).toEqual('WorldSkills Events');

    var events = element.all(by.repeater('event in events.events'));
    expect(events.count()).toEqual(3);
    expect(events.first().getText()).toEqual('3 WorldSkills Abu Dhabi 2017 1 September 2017 United Arab Emirates');

    events.first().element(by.binding('event.id')).click();

    expect(element(by.tagName('h1')).getText()).toEqual('WorldSkills Abu Dhabi 2017');
  });
});
