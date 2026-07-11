@auth
Feature: User login

  @smoke
  Scenario: Successful admin login
    Given I am on the login page
    When I enter valid admin credentials
    Then I should be redirected to the home page
    And I should see the logout button

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I enter "invalid@test.com" as the email
    And I enter "wrongpassword" as the password
    And I submit the login form
    Then I should see "Invalid credentials"
    And I should remain on the login page
