@client
Feature: Global search autocomplete

  Scenario: Search shows autocomplete results
    Given I am on the home page
    When I type "Ars" into the global search
    Then I should see autocomplete suggestions appear

  Scenario: Selecting a result navigates to detail
    Given I am on the home page
    When I type a search term with results
    And I select the first autocomplete suggestion
    Then I should be navigated to a detail page
