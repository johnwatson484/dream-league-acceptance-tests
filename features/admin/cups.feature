@admin
Feature: Cup administration

  Background:
    Given I am logged in as an admin

  Scenario: View create cup page
    When I navigate to "/cup/create"
    Then I should see "Create Cup"

  Scenario: Create a new cup
    When I create a cup named "Test Cup"
    Then I should be on "/cups"
    And I should see "Test Cup"

  Scenario: Edit a cup
    Given a cup "Test Cup" exists
    And I navigate to edit cup "Test Cup"
    When I clear and fill in "name" with "Test Cup Updated"
    And I submit the form
    Then I should be on "/cups"

  Scenario: Delete a cup
    Given a cup "Test Cup" exists
    And I navigate to delete cup "Test Cup"
    When I confirm the deletion
    Then I should be on "/cups"
    And I should not see "Test Cup"
