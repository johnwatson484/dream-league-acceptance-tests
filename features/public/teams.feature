@public
Feature: Teams listing

  Scenario: View teams page
    When I navigate to the teams page
    Then I should see a table of teams

  Scenario: Search for a team
    Given I am on the teams page
    When I search for a team by name
    Then the results should be filtered

  Scenario: Filter teams by division
    Given I am on the teams page
    When I filter by a division
    Then only teams in that division should be displayed

  Scenario: Navigate to team detail
    Given I am on the teams page
    When I click a team name
    Then I should be on a team detail page
