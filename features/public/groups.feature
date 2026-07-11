@public
Feature: Groups listing

  Scenario: View groups page
    When I navigate to the groups page
    Then I should see group content
