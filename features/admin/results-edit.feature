@admin
Feature: Results entry

  Background:
    Given I am logged in as an admin
    And I navigate to the results edit page

  Scenario: View results edit page
    Then I should see the gameweek selector

  Scenario: Select a gameweek
    When I select a gameweek for results entry
    Then the results form should be displayed

  Scenario: Increment goals for a player
    Given I have selected a gameweek
    When I click the plus button for a player
    Then the goals input should show "1"

  Scenario: Decrement goals for a player
    Given I have selected a gameweek
    And I click the plus button for a player
    When I click the minus button for that player
    Then the goals input should show "0"
