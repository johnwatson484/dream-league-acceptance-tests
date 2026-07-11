@public
Feature: Conceded listing

  Scenario: View conceded page
    When I navigate to the conceded page
    Then I should see a list of conceded entries
