@admin
Feature: Manager administration

  Background:
    Given I am logged in as an admin

  Scenario: View create manager page
    When I navigate to "/manager/create"
    Then I should see "Create Manager"

  Scenario: Create a new manager
    When I create a manager named "Test Manager" with alias "TM" and email "testmanager@example.com"
    Then I should be on "/managers"
    And I should see "Test Manager"

  Scenario: Edit a manager
    Given a manager "Test Manager" exists
    And I navigate to edit manager "Test Manager"
    When I clear and fill in "alias" with "TMgr"
    And I submit the form
    Then I should be on "/managers"

  Scenario: Delete a manager
    Given a manager "Test Manager" exists
    And I navigate to delete manager "Test Manager"
    When I confirm the deletion
    Then I should be on "/managers"
    And I should not see "Test Manager"
