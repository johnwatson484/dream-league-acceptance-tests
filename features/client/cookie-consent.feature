@client
Feature: Cookie consent banner

  Scenario: Banner shown on first visit
    Given I have cleared my cookies
    When I navigate to the home page
    Then I should see the cookie consent banner

  Scenario: Accepting cookies hides the banner
    Given the cookie consent banner is visible
    When I accept cookies
    Then the cookie banner should be hidden
