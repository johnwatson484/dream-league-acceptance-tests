@admin
Feature: History administration

  Background:
    Given I am logged in as an admin

  Scenario: View create history page
    When I navigate to "/history/create"
    Then I should see "Create History"

  Scenario: Create a history entry
    When I create a history entry for year "2098" with "8" teams won by "Test Winner"
    Then I should be on "/history"
    And I should see "2098"

  Scenario: Delete a history entry
    Given a history entry for year "2098" exists
    And I navigate to delete history entry "2098"
    When I confirm the deletion
    Then I should be on "/history"
    And I should not see "2098"
