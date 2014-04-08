describe('Events app', function() {
  it('should display events', function() {
    // Load the AngularJS homepage.
    browser.get('http://localhost:9000/#/events');

    var events = element.all(by.repeater('event in events'));
    expect(events.count()).toBeGreaterThan(0);
    expect(events.first().getText()).toEqual('645 WorldSkills Leipzig 2013 2 July 2013 7 July 2013 Leipzig, Germany');
  });
});
