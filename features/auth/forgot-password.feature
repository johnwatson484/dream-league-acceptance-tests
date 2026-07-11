@auth
Feature: Forgot password

  Scenario: View forgot password page
    Given I navigate to "/forgot-password"
    Then I should see "Forgotten password"

  Scenario: Submit forgot password request
    Given I navigate to "/forgot-password"
    When I enter "test@example.com" as the email
    And I submit the login form
    Then I should see "If your email address is registered"
