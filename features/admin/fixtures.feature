@admin
Feature: Fixture administration

  Background:
    Given I am logged in as an admin

  Scenario: View create fixture page
    When I navigate to "/fixture/create"
    Then I should see "Create Fixture"

  Scenario: View fixtures generate page
    When I navigate to "/fixtures/generate"
    Then I should see "Generate"

  Scenario: View fixtures reschedule page
    When I navigate to "/fixtures/reschedule"
    Then I should see "Reschedule"
