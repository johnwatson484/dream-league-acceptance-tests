@admin
Feature: Group administration

  Background:
    Given I am logged in as an admin

  Scenario: View create group page
    When I navigate to "/group/create"
    Then I should see "Create Group"
