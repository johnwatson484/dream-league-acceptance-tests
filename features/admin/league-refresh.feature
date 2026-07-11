@admin
Feature: League data refresh

  Background:
    Given I am logged in as an admin

  Scenario: View league refresh page
    When I navigate to "/league/refresh"
    Then I should see the file upload form
