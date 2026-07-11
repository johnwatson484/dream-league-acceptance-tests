@public
Feature: Players listing

  Scenario: View players page
    When I navigate to the players page
    Then I should see a table of players

  Scenario: Search for a player
    Given I am on the players page
    When I search for a player by name
    Then the results should be filtered

  Scenario: Filter players by position
    Given I am on the players page
    When I filter by "Defenders"
    Then only defenders should be displayed

  Scenario: Navigate to player detail
    Given I am on the players page
    When I click a player name
    Then I should be on a player detail page
