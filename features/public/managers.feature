@public
Feature: Managers listing

  Scenario: View managers page
    When I navigate to the managers page
    Then I should see a list of managers

  Scenario: Navigate to manager detail
    Given I am on the managers page
    When I click a manager name
    Then I should see the manager detail page
    And I should see their team roster
