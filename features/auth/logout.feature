@auth
Feature: User logout

  Scenario: Successful logout
    Given I am on the login page
    When I enter valid admin credentials
    And I click logout
    Then I should see the login link
