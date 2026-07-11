@public
Feature: Results viewing

  Scenario: View results page
    When I navigate to the results page
    Then I should see results content

  Scenario: Filter results by gameweek
    Given I am on the results page
    When I select a gameweek from the filter
    Then the results should update
