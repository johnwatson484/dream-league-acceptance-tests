@admin
Feature: Team administration

  Background:
    Given I am logged in as an admin

  Scenario: View create team page
    When I navigate to "/league/team/create"
    Then I should see "Create Team"

  Scenario: Create a new team
    When I create a team named "Test FC" with alias "TFC"
    Then I should be on "/league/teams"
    And I should see "Test FC"

  Scenario: Edit a team
    Given a team "Test FC" exists
    And I navigate to edit team "Test FC"
    When I clear and fill in "alias" with "TFCU"
    And I submit the form
    Then I should be on "/league/teams"

  Scenario: Delete a team
    Given a team "Test FC" exists
    And I navigate to delete team "Test FC"
    When I confirm the deletion
    Then I should be on "/league/teams"
    And I should not see "Test FC"
