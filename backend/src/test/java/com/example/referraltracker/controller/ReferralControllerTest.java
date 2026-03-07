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
    public void shouldGetReferrals() throws Exception {
        mockMvc.perform(get("/api/referrals"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.referrals[0].id").value("ref001"))
                .andExpect(jsonPath("$.referrals[0].status").value("Pending"))
                .andExpect(jsonPath("$.referrals[0].referredBy.name").value("Dr. Jane Smith"));
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
                .andExpect(status().isNotFound());
    }
}
