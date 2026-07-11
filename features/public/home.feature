@public @smoke
Feature: Home page

  Scenario: View home page content
    When I navigate to the home page
    Then I should see the league table
    And I should see the latest results
    And I should see the top scorers
    And I should see the form table

  Scenario: Navigate to results from home
    Given I am on the home page
    When I click the "Results" navigation link
    Then I should be on the results page
