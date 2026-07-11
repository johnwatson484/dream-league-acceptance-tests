@admin
Feature: Teamsheet editing

  Background:
    Given I am logged in as an admin

  Scenario: View teamsheet edit page
    When I navigate to "/teamsheet/edit"
    Then I should see player input fields
    And I should see keeper input fields

  Scenario: Player autocomplete shows results
    Given I am on the teamsheet edit page
    When I type in a player input field
    Then I should see autocomplete suggestions
