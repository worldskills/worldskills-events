describe('Events app', function() {

  it('should display events', function() {

    // set fake access token
    browser.get('');
    browser.driver.executeScript("window.sessionStorage.setItem('access_token', 'ABC123');");

    browser.get('/#/events');

    expect(browser.getTitle()).toEqual('WorldSkills Events');

    var events = element.all(by.repeater('event in events.events'));
    expect(events.count()).toEqual(3);
    expect(events.first().getText()).toEqual('3 WorldSkills Abu Dhabi 2017 1 September 2017 United Arab Emirates');
  });

  describe('Create event', function() {

    it('should create an event', function() {

      element(by.linkText('Add Event')).click();

      element(by.model('event.name')).sendKeys("WorldSkills Abu Dhabi 2017");
      element(by.model('event.ws_entity')).sendKeys("WorldSkills International");
      element(by.model('event.type')).sendKeys("Competition");
      element(by.model('event.start_date')).clear().sendKeys("2017-09-01");
      element(by.model('event.end_date')).clear().sendKeys("2017-09-30");
      element(by.model('event.country')).sendKeys("AFGHANISTAN");

      element(by.partialButtonText('Save')).click();

      var messages = element.all(by.repeater('message in alert.messages'));
      expect(messages.first().getText()).toContain('The Event has been added successfully.');
    });

    afterEach(function () {
      var event = apiMockRequests['POST /events'].body;
      expect(event.name).toEqual("WorldSkills Abu Dhabi 2017");
      expect(event.ws_entity.id).toEqual(1);
      expect(event.start_date).toEqual("2017-09-01");
      expect(event.end_date).toEqual("2017-09-30");
      expect(event.type).toEqual("competition");
      expect(event.country.id).toEqual(1);
    });

  });

  describe('Edit event', function() {

    it('should show event form', function () {

      browser.get('/#/events');

      var events = element.all(by.repeater('event in events.events'));
      events.first().element(by.binding('event.id')).click();

      expect(element(by.tagName('h1')).getText()).toEqual('WorldSkills Abu Dhabi 2017');
    });
  });

});
