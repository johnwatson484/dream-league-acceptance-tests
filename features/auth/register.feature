@auth
Feature: User registration

  Scenario: View registration page
    Given I navigate to "/register"
    Then I should see "Only league members can register"

  Scenario: Registration with unrecognised email
    Given I navigate to "/register"
    When I enter "unknown@test.com" as the email
    And I enter "password123" as the password
    And I submit the login form
    Then I should see "Email already registered or not a league member"
