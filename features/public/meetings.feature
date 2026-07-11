@public
Feature: Meetings listing

  Scenario: View meetings page
    When I navigate to the meetings page
    Then I should see a list of meetings
