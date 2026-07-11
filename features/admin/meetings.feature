@admin
Feature: Meeting administration

  Background:
    Given I am logged in as an admin

  Scenario: View create meeting page
    When I navigate to "/meeting/create"
    Then I should see "Create Meeting"

  Scenario: Create a new meeting
    When I create a meeting on "2099-12-31"
    Then I should be on "/meetings"
    And I should see "2099"

  Scenario: Edit a meeting
    Given a meeting on "2099-12-31" exists
    And I navigate to edit meeting "2099"
    When I clear and fill in "date" with "2099-06-15"
    And I submit the form
    Then I should be on "/meetings"

  Scenario: Delete a meeting
    Given a meeting on "2099-12-31" exists
    And I navigate to delete meeting "2099"
    When I confirm the deletion
    Then I should be on "/meetings"
