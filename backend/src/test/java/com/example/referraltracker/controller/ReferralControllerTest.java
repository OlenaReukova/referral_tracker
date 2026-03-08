package com.example.referraltracker.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ReferralControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void shouldGetReferralDetailsByReferralId() throws Exception {
        String patientId = "123456789";
        String referralId = "ref001";

        mockMvc.perform(get("/mock/api/v1/patients/" + patientId + "/referrals/" + referralId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(referralId))
                .andExpect(jsonPath("$.status").value("Pending"))
                .andExpect(jsonPath("$.referredBy.name").value("Dr. Jane Smith"));
    }

    @Test
    public void shouldReturn404WhenReferralNotFound() throws Exception {
        String patientId = "123456789";
        String referralId = "ref999";

        mockMvc.perform(get("/mock/api/v1/patients/" + patientId + "/referrals/" + referralId))
                .andExpect(status().isNotFound());
    }
}
