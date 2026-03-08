package com.example.referraltracker.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.junit.jupiter.api.BeforeEach;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
public class ReferralControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void shouldGetReferrals() throws Exception {
        mockMvc.perform(get("/api/referrals"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value("ref001"))
                .andExpect(jsonPath("$[0].status").value("Pending"))
                .andExpect(jsonPath("$[0].referredBy.name").value("Dr. Jane Smith"));
    }

    @Test
    public void shouldGetReferralById() throws Exception {
        mockMvc.perform(get("/api/referrals/ref001"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value("ref001"))
                .andExpect(jsonPath("$.status").value("Pending"))
                .andExpect(jsonPath("$.referredBy.name").value("Dr. Jane Smith"));
    }

    @Test
    public void shouldReturn404WhenReferralNotFound() throws Exception {
        mockMvc.perform(get("/api/referrals/ref999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Referral not found with id: ref999"));
    }

    @Test
    public void shouldReturn400WhenInvalidIdFormat() throws Exception {
        mockMvc.perform(get("/api/referrals/abc"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("Invalid referral ID format")));
    }

    @Test
    public void shouldUpdateReferralStatus() throws Exception {
        String updatePayload = "{\"status\": \"Scheduled\"}";
        mockMvc.perform(put("/api/referrals/ref001")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatePayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("ref001"))
                .andExpect(jsonPath("$.status").value("Scheduled"));
    }

    @Test
    public void shouldReturn400WhenStatusIsMissingInUpdate() throws Exception {
        String updatePayload = "{}";
        mockMvc.perform(put("/api/referrals/ref001")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatePayload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Status is required"));
    }

    @Test
    public void shouldReturn404WhenUpdatingNonExistentReferral() throws Exception {
        String updatePayload = "{\"status\": \"Scheduled\"}";
        mockMvc.perform(put("/api/referrals/ref999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatePayload))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Referral not found with id: ref999"));
    }
}
