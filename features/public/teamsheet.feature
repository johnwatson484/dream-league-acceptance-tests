@public
Feature: Teamsheet viewing

  Scenario: View teamsheet page
    When I navigate to the teamsheet page
    Then I should see manager sections with players and teams

  Scenario: Navigate to player detail from teamsheet
    Given I am on the teamsheet page
    When I click a player link
    Then I should be on a player detail page
