package com.example.profile.controllers;

import com.example.profile.model.Profile;
import com.example.profile.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PutMapping
    public Profile upsertProfile(@RequestBody Profile profile) {
        return profileService.upsertProfile(profile);
    }
}
