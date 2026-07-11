@admin
Feature: Player administration

  Background:
    Given I am logged in as an admin

  Scenario: View create player page
    When I navigate to "/league/player/create"
    Then I should see "Create Player"

  Scenario: Create a new player
    When I create a player with first name "Test" and last name "Player" as a "Midfielder"
    Then I should be on "/league/players"
    And I should see "Test Player"

  Scenario: Edit a player
    Given a player "Test Player" exists
    And I navigate to edit player "Test Player"
    When I clear and fill in "firstName" with "Updated"
    And I submit the form
    Then I should be on "/league/players"

  Scenario: Delete a player
    Given a player "Test Player" exists
    And I navigate to delete player "Test Player"
    When I confirm the deletion
    Then I should be on "/league/players"
    And I should not see "Test Player"
